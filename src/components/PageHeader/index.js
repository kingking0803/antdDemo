import React, { Component, createElement } from 'react';
import { Breadcrumb, Tabs, Skeleton } from 'antd';
import { urlToList } from '../_utils/pathTools';
import pathToRegexp from 'path-to-regexp';
import styles from './index.less';
import classNames from 'classnames';

export const getBreadcrumb = (breadcrumbNameMap, url) => {
    let breadcrumb = breadcrumbNameMap[url];
    if (!breadcrumb) {
        Object.keys(breadcrumbNameMap).forEach(item => {
            if (pathToRegexp(item).test(url)) {
                breadcrumb = breadcrumbNameMap[item];
            }
        });
    }
    return breadcrumb || {};
};

export default class PageHeader extends Component {

    state = {
        breadcrumb: null,
    }

    componentDidMount() {
        this.getBreadcrumbDom();
    }

    componentDidUpdate(preProps) {
        const { location } = this.props;
        if (!location || !preProps.location) {
            return;
        }
        const prePathname = preProps.location.pathname;
        if (prePathname !== location.pathname) {
            this.getBreadcrumbDom();
        }
    }

    getBreadcrumbDom() {
        const breadcrumb = this.conversionBreadcrumbList();
        this.setState({
            breadcrumb,
        });
    }

    getBreadcrumbProps() {
        const { routes, params, location, breadcrumbNameMap } = this.props;
        return {
            routes,
            params,
            routerLocation: location,
            breadcrumbNameMap,
        };
    };

    conversionFromProps() {
        const { breadcrumbList, breadcrumbSeparator, itemRender, linkElement = 'a' } = this.props;
        return (
            <Breadcrumb separator={breadcrumbSeparator}>
                {
                    breadcrumbList.map(item => {
                        const title = itemRender ? itemRender(item) : item.title;
                        return (
                            <Breadcrumb.Item key={item.title} />
                        );
                    })
                }
            </Breadcrumb>
        );
    }

    conversionFromLocation(routerLocation, breadcrumbNameMap) {
        const { breadcrumbSeparator, home, itemRender, linkElement = 'a' } = this.props;
        const pathSnippets = urlToList(routerLocation.pathname);
        const extraBreadcrumbItems = pathSnippets.map((url, index) => {
            const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
            if (currentBreadcrumb.inherited) {
                return null;
            }
            const isLinkable = index !== pathSnippets.length - 1 && currentBreadcrumb.component;
            const name = itemRender ? itemRender(currentBreadcrumb) : currentBreadcrumb.name;
            return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
                <Breadcrumb.Item key={url}>
                    {createElement(
                        isLinkable ? linkElement : 'span',
                        { [linkElement === 'a' ? 'href' : 'to']: url },
                        name
                    )}
                </Breadcrumb.Item>
            ) : null;
        });
        // extraBreadcrumbItems.unshift(
        //     <Breadcrumb.Item key="home">
        //         {createElement(
        //             linkElement,
        //             {
        //                 [linkElement === 'a' ? 'href' : 'to']: '/',
        //             },
        //             home || 'Home'
        //         )}
        //     </Breadcrumb.Item>
        // );
        return (
            <Breadcrumb separator={breadcrumbSeparator}>
                {extraBreadcrumbItems}
            </Breadcrumb>
        );
    }

    /**
     * 将参数转为面包屑
     */
    conversionBreadcrumbList() {
        const { breadcrumbList, breadcrumbSeparator } = this.props;
        const { routerLocation, breadcrumbNameMap } = this.getBreadcrumbProps();
        if (breadcrumbList && breadcrumbList.length) {
            return this.conversionFromProps();
        }
        // 根据 location 生成 面包屑
        // Generate breadcrumbs based on location
        if (routerLocation && routerLocation.pathname) {
            return this.conversionFromLocation(routerLocation, breadcrumbNameMap);
        }
        return null;
    }

    render() {
        const {
            title,
            logo,
            action,
            content,
            extraContent,
            tabList,
            className,
            tabActiveKey,
            tabDefaultActiveKey,
            tabBarExtraContent,
            loading = false,
            wide = false,
        } = this.props;

        const { breadcrumb } = this.state;
        return (
            <div className={styles.pageHeader}>
                {breadcrumb}
                <div className={styles.detail}>
                    {logo && <div className={styles.logo}>{logo}</div>}
                    <div className={styles.main}>
                        <div className={styles.row}>
                            {title && <h1 className={styles.title}>{title}</h1>}
                            {action && <div className={styles.action}>{action}</div>}
                        </div>
                        <div className={styles.row}>
                            {content && <div className={styles.content}>{content}</div>}
                            {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}