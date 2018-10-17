import { Component } from 'react';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import Context from './MenuContext';
import SiderMenu from '@/components/SiderMenu';
import Authorized from '@/utils/Authorized';
import { connect } from 'dva';

const { Header, Footer, Content } = Layout;

// 将路由转成导航栏菜单
function formatter(data, parentPath = '', parentAuthority) {
    return data.map(item => {
        // let locale = 'menu';
        // if (parentName && item.name) {
        //     locale = `${parentName}.${item.name}`;
        // } else if (item.name) {
        //     locale = `menu.${item.name}`;
        // } else if (parentName) {
        //     locale = parentName;
        // }
        const result = {
            ...item,
            // locale,
            authority: item.authority || parentAuthority,
        };
        if (item.routes) {
            const children = formatter(item.routes, `${parentPath}${item.path}/`, item.authority);
            // Reduce memory usage
            result.children = children;
        }
        delete result.routes;
        return result;
    });
}

@connect(({ login }) => ({
    login
}))
class BasicLayout extends Component {
    constructor(props) {
        super(props);
        // this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
        this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    }

    getHeadWidth = () => {
        return 'calc(100% - 256px)';
    }

    componentDidUpdate() {
        this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    }

    getMenuData() {
        const {
            route: { routes },
        } = this.props;
        
        const result = formatter(routes);
        return result;
    }

    /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
    getBreadcrumbNameMap() {
        const routerMap = {};
        const mergeMenuAndRouter = data => {
            data.forEach(menuItem => {
                if (menuItem.children) {
                    mergeMenuAndRouter(menuItem.children);
                }
                // Reduce memory usage
                routerMap[menuItem.path] = menuItem;
            });
        };
        mergeMenuAndRouter(this.getMenuData());
        return routerMap;
    }

    getContext() {
        const { location } = this.props;
        return {
            location,
            breadcrumbNameMap: this.breadcrumbNameMap,
        };
    }

    handleClickLogout() {
        const { dispatch } = this.props;
        dispatch({
            type: 'login/logout',
        });
    }

    render() {

        const menu = (
            <Menu>
                <Menu.Item key="userCenter">
                    <Icon type="user" />
                    个人信息
                </Menu.Item>
                <Menu.Item key="userinfo">
                    <Icon type="setting" />
                    密码修改
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout" onClick={this.handleClickLogout.bind(this)}>
                    <Icon type="logout" />
                    退出登录
              </Menu.Item>
            </Menu>
        );

        const width = this.getHeadWidth();

        const layout = (
            <Layout>
                <SiderMenu Authorized={Authorized} menuData={this.getMenuData()} {...this.props} />
                <Layout style={{ paddingLeft: '256px' }}>
                    <Header style={{ position: 'fixed', zIndex: 1, width: width, background: '#fff', textAlign: 'center', padding: 0 }}>
                        <div style={{ float: 'right', height: '100%', paddingRight: '20px' }}>
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" href="#">
                                    king <Icon type="down" />
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{ margin: '80px 16px 80px' }}>
                        <div style={{ padding: 10, minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', position: 'fixed', zIndex: 1, bottom: 0, width: width }}>©2018 Created by suqj</Footer>
                </Layout>
            </Layout>
        );

        return (
            <Context.Provider value={this.getContext()}>
                {layout}
            </Context.Provider>
        )
    }
}

export default BasicLayout;