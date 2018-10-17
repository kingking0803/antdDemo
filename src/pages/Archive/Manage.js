import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Table from '@/components/Table';



@connect(({ register, loading }) => ({
    register,
    loading: loading.models.register,
}))
export default class List extends Component {

    state = {
        columns: [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 100,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                width: 200,               
            },
            {
                title: '民族',
                dataIndex: 'type',
                key: 'type',
                
            },
        ],
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'register/queryList',
        });
    }

    render() {
        const {
            register: { data },
        } = this.props;
        const { loading } = this.props;
        return (
            <div>
                <PageHeaderWrapper title="查阅单管理" content="保留查档后的结果，方便以后查询">
                    <Table 
                        bordered
                        columns={this.state.columns}
                        dataSource={data}
                        rowKey="id"
                        loading={loading}
                        type="manage"/>
                </PageHeaderWrapper>
            </div>
        );
    }
}