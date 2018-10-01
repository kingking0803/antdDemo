import React, { Fragment, PureComponent } from 'react';
import styles from './UserLayout.less';
import Link from 'umi/link';
import { Icon } from 'antd';
import logo from '../assets/logo.svg';

class UserLayout extends PureComponent {

    render() {
        const {children} = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src={logo} />
                                <span className={styles.title}>Ant Design</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
                    </div>
                    {children}
                </div>
            </div>
        );
    }
}

export default UserLayout;