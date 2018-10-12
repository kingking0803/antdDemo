import { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';
import { urlToList } from '../_utils/pathTools'
import pathToRegexp from 'path-to-regexp';

const { Sider } = Layout;

// 引入子菜单组件
const SubMenu = Menu.SubMenu;

/**
 * 获得匹配的菜单节点
 * @memberof SiderMenu
 */
const getDefaultCollapsedSubMenus = props => {
    const {
        location: { pathname },
        menuData,
    } = props;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    const result = urlToList(pathname)//['/archive','/archive/register']
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item);
    console.log(result,"result");
    return result;
};

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
const getFlatMenuKeys = menuData => {
    let keys = [];
    menuData.forEach(item => {
        if (item.children) {
            keys = keys.concat(getFlatMenuKeys(item.children));
        }
        keys.push(item.path);
    });
    return keys;
};

const getIcon = icon => {
    if (typeof icon === 'string') {
        return <Icon type={icon} />;
    }
    return icon;
};

//从菜单列表中查找与当前路径匹配的菜单
const getMenuMatches = (flatMenuKeys, path) => flatMenuKeys.filter(item => item && pathToRegexp(item).test(path));

export default class SiderMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openKeys: getDefaultCollapsedSubMenus(props),
        }
    }

    handleOpenChange = openKeys => {
        console.log(openKeys);
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
        });
    }

    isMainMenu = key => {
        const { menuData } = this.props;
        console.log(menuData,"menuData");
        return menuData.some(item => {
            if (key) {
                return item.key === key || item.path === key;
            }
            return false;
        });
    };

    getSelectedMenuKeys = () => {
        const {
            location: { pathname },
        } = this.props;
        return urlToList(pathname).map(itemPath => getMenuMatches(getFlatMenuKeys(this.props.menuData), itemPath).pop());
    };

    getNavMenuItems(menuData, parent) {
        if (!menuData) {
            return [];
        }
        return menuData.filter(item => item.name && !item.hideInMenu)
            .map(item => {
                const ItemDom = this.getSubMenuOrItem(item, parent);
                // return ItemDom;
                return this.checkPermissionItem(item.authority, ItemDom);
            }).filter(item => item);
    }

    // permission to check
    checkPermissionItem = (authority, ItemDom) => {
        const { Authorized } = this.props;
        if (Authorized && Authorized.check) {
            const { check } = Authorized;
            return check(authority, ItemDom);
        }
        return ItemDom;
    };

    getSubMenuOrItem(item) {
        if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
            const name = item.name;
            return (
                <SubMenu title={
                    item.icon ? (
                        item.isIcon ? (<span><img/></span>) : (
                        <span>
                            {getIcon(item.icon)}
                            <span>{name}</span>
                        </span>)
                    ) : name
                }
                    key={item.path}
                >
                    {this.getNavMenuItems(item.children)}
                </SubMenu>
            );
        }
        return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
    }

    getMenuItemPath = item => {
        const name = item.name;
        const itemPath = this.conversionPath(item.path);
        const icon = getIcon(item.icon);
        // const { target } = item;
        // if (/^https?:\/\//.test(itemPath)) {
        //     return (
        //         <a href={itemPath} target={target}>
        //             {icon}
        //             <span>{name}</span>
        //         </a>
        //     );
        // }
        return (
            <Link
                to={itemPath}
            >
                {icon}
                <span>{name}</span>
            </Link>
        );
    }

    conversionPath = path => {
        if (path && path.indexOf('http') === 0) {
            return path;
        }
        return `/${path || ''}`.replace(/\/+/g, '/');
    };

    render() {
        const { openKeys } = this.state;
        const { menuData } = this.props;

        let selectedKeys = this.getSelectedMenuKeys();
        

        return (
            <Sider width={256} style={{ overflow: 'auto', position: 'fixed', height: '100vh', left: 0, top: 0 }}>
                <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
                <Menu theme="dark" mode="inline"
                    defaultSelectedKeys={['1']}
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    onOpenChange={this.handleOpenChange}>
                    {this.getNavMenuItems(menuData)}
                    {/* <Menu.Item key='/helloworld'>
                        <Link to='/helloworld'>
                            <Icon type='pie-chart' />
                            <span>Hello World</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key='/dashboard' title={<span><Icon type='dashboard' /><span>Dashboard</span></span>}>
                        <Menu.Item key='/dashboard/analysis'><Link to='/dashboard/analysis'>分析页</Link></Menu.Item>
                        <Menu.Item key='/dashboard/monitor'><Link to='/dashboard/monitor'>监控页</Link></Menu.Item>
                        <Menu.Item key='/dashboard/workplace'><Link to='/dashboard/workplace'>工作台</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key='/puzzlecard'>
                        <Link to='/puzzlecard'>
                            <Icon type='pie-chart' />
                            <span>puzzlecard</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key='/archive' title={<span><Icon type='dashboard' /><span>档案利用</span></span>}>
                        <Menu.Item key='/archive/register'><Link to='/archive/register'>查阅单登记</Link></Menu.Item>
                        <Menu.Item key='/archive/manage'><Link to='/archive/manage'>查阅单管理</Link></Menu.Item>
                    </SubMenu> */}
                </Menu>
            </Sider>
        );
    }
}