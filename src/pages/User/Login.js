import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Login.less';
import Login from '@/components/Login'

@connect(({login}) => ({
    login,
}))
class LoginPage extends Component{

    state = {
        type: 'account',
        autoLogin: true,
    }

    render(){
        return (
            <div className={styles.main}></div>
        );
    }
}
export default LoginPage;