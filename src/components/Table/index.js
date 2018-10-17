import React, { Component } from 'react';
import { Table, Tooltip } from 'antd';
import { Resizable } from 'react-resizable';
import { getLocalStorageByKey, getLocalStorageTableColWidthByKey, setLocalStorageTableColWidth } from '@/utils/tableColStorage';

const ResizeableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    );
};

let styles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'inline-block',
}

const getNewColumns = (props) => {
    const result = props.columns.map((item) => {
        const w = getLocalStorageByKey(props.type) ? getLocalStorageTableColWidthByKey(props.type, item.key) : item.width;
        item.width = w;
        const width = item.width ? item.width : 100;
        item.render = (text) => (
            <Tooltip title={text} trigger="click">
                <span style={{ ...styles, width: width + 'px', minWidth: '100px' }} >{text}</span>
            </Tooltip>
        );
        return item;
    })
    return result;
}

export default class TableWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: getNewColumns(props),
        }
    }

    components = {
        header: {
            cell: ResizeableTitle,
        },
    };

    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {

            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            nextColumns[index].render = (text) => <Tooltip title={text} trigger="click"><span style={{ ...styles, width: size.width + 'px', minWidth: '100px' }}>{text}</span></Tooltip>;
            let json = {};
            nextColumns.map((col) => {
                json[col.key] = col.width;
            });
            setLocalStorageTableColWidth(this.props.type, json);
            return { columns: nextColumns };
        });
    };

    render() {
        const columns = this.state.columns.map((col, index) => {
            col.onHeaderCell = column => ({
                width: column.width,
                onResize: this.handleResize(index),
            });
            return col;
        });

        return (
            <Table components={this.components}
                {...this.props}
                columns={columns}
                scroll={{ x: true }} />
        );
    }

}
