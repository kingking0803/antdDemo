import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ register }) => ({
    register,
}))
export default class List extends Component {

    columns = [
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '性别',
            dataIndex: 'sex',
        },
        {
            title: '民族',
            dataIndex: 'type',
        },
    ];

    componentDidMount() {
        this.props.dispatch({
            type: 'register/queryList',
        });
    }

    render() {
        const {
            register: { data },
        } = this.props;
        return (
            <div>
                <PageHeaderWrapper title="查阅单管理" content="保留查档后的结果，方便以后查询">
                    <Table columns={this.columns} dataSource={data} rowKey="id" />
                </PageHeaderWrapper>
            </div>
        );
    }
}