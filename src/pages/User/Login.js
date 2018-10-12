import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Login.less';
import Login from '@/components/Login';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login }) => ({
    login,
}))
class LoginPage extends Component {

    state = {
        type: 'account',
        autoLogin: true,
    }

    onTabChange = type => {
        this.setState({ type });
    };

    handleSubmit = (err, values) => {
        const { type } = this.state;
        if (!err) {
            const { dispatch } = this.props;
            dispatch({
                type: 'login/login',
                payload: {
                    ...values,
                    type,
                },
            });
        }
    };

    renderMessage = content => (
        <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );

    render() {
        const { login } = this.props;
        const { type, autoLogin } = this.state;
        return (
            <div className={styles.main}>
                <Login
                    defaultActiveKey={type}
                    // onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                    ref={form => {
                        this.loginForm = form;
                    }}
                >
                    <Tab key="account" tab="账户密码登录">
                        {login.status === 'error' &&
                            login.type === 'account' &&

                            this.renderMessage('账户或密码错误（admin/888888）')}
                        <UserName name="userName" placeholder="admin/user" />
                        <Password
                            name="password"
                            placeholder="888888/123456"
                            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
                        />
                    </Tab>
                    <div>
                        <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                            自动登录
                        </Checkbox>
                        <a style={{ float: 'right' }} href="">
                            忘记密码
                        </a>
                    </div>
                    <Submit>登录</Submit>
                </Login>
            </div>
        );
    }
}
export default LoginPage;