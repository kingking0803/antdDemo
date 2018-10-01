import React, { Component } from 'react';
import Context from '@/layouts/MenuContext'
import PageHeader from '../PageHeader'
import Link from 'umi/link';

export default class Wrapper extends Component {
    render() {

        return (
            <div style={{ margin: '-24px -24px 0' }}>
                <Context.Consumer>
                    {
                        value => (
                            <PageHeader
                                {...value}
                                {...this.props}
                                linkElement={Link}
                                itemRender={item => {
                                    return item.name;
                                }}
                            />
                        )
                    }
                </Context.Consumer>
                {this.props.children}
            </div>
        );
    }
}