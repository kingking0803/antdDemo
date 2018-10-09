import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import omit from 'omit.js';
import styles from './index.less';
import ItemMap from './map';
import LoginContext from './loginContext';

const FormItem = Form.Item;

class WarpFormItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    componentDidMount() {
        const { updateActive, name } = this.props;
        if (updateActive) {
            updateActive(name);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getFormItemOptions = ({ onChange, defaultValue, rules }) => {
        const options = {
            rules: rules || this.customprops.rules,
        };
        if (onChange) {
            options.onChange = onChange;
        }
        if (defaultValue) {
            options.initialValue = defaultValue;
        }
        return options;
    };

    render() {
        const { count } = this.state;
        const {
            form: { getFieldDecorator },
        } = this.props;
        // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props
        const {
            onChange,
            customprops,
            defaultValue,
            rules,
            name,
            buttonText,
            updateActive,
            type,
            ...restProps
        } = this.props;
        // get getFieldDecorator props
        const options = this.getFormItemOptions(this.props);

        const otherProps = restProps || {};

        return (
            <FormItem>
                {getFieldDecorator(name, options)(<Input {...customprops} {...otherProps} />)}
            </FormItem>
        );

    }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
    const item = ItemMap[key];
    LoginItem[key] = props => (
        <LoginContext.Consumer>
            {context => (
                <WarpFormItem
                    customprops={item.props}
                    {...props}
                    rules={item.rules}
                    type={key}
                    updateActive={context.updateActive}
                    form={context.form}
                />
            )}
        </LoginContext.Consumer>
    );
});
export default LoginItem;