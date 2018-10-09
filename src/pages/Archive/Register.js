import React, { Component, Fragment } from 'react';
import {
    Card,
    Col,
    Row,
    Form,
    Input,
    Select,
    Upload,
    Button,
    Checkbox,
} from 'antd';
import { connect } from 'dva';
import styles from './register.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const { TextArea } = Input;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar, methodName }) => (
    <Fragment>
        {/* <div className={styles.avatar_title}>Avatar</div> */}
        <div className={styles.avatar}>
            <img src={avatar} alt="avatar" />
        </div>
        <Upload fileList={[]}>
            <div className={styles.button_view}>
                <Button icon="upload">{methodName}</Button>
            </div>
        </Upload>
    </Fragment>
);

@connect(({ register, loading }) => ({
    register,
    submitting: loading.effects['register/addOne']
}))
@Form.create()
export default class RegisterPage extends Component {

    getAvatarURL() {
        // const { currentUser } = this.props;
        // if (currentUser.avatar) {
        //   return currentUser.avatar;
        // }
        const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
        return url;
    }

    render() {
        const { submitting } = this.props;

        const formItemLayout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 12,
            },
        };

        const formItemLayout1 = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 16,
            },
        };

        const { form, dispatch } = this.props;
        const { getFieldDecorator, validateFieldsAndScroll } = form;

        const validate = () => {
            validateFieldsAndScroll((error, values) => {
                if (!error) {
                    // submit the values
                    dispatch({
                        type: 'register/addOne',
                        payload: values,
                    });
                }
            });
        };

        return (
            <PageHeaderWrapper title="查阅单登记" content="提供自助查档、前台查档功能">
                <div style={{ background: '#ECECEC' }}>
                    <Form>
                        <Row gutter={16} style={{ margin: '10px' }}>
                            <Col span={12}>
                                <Card title="查阅人信息" bordered={false} style={{ height: '700px' }}>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <FormItem {...formItemLayout} label="利用者类别">
                                            <Select placeholder="--请选择--">
                                                <Option value="个人查阅">个人查阅</Option>
                                                <Option value="单位查阅">单位查阅</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="姓名">
                                            {getFieldDecorator('name', {
                                                rules: [{ required: true, message: '请填写姓名' }],
                                            })(<Input />)}
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="性别">
                                            {getFieldDecorator('sex', {
                                                rules: [{ required: true, message: '请填写性别' }],
                                            })(<Input />)}
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="民族">
                                            {getFieldDecorator('type', {
                                                rules: [{ required: true, message: '请填写民族' }],
                                            })(<Input />)}
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="证件类型">
                                            <Select placeholder="--请选择--">
                                                <Option value="身份证">身份证</Option>
                                                <Option value="居民户口簿">居民户口簿</Option>
                                                <Option value="临时身份证">临时身份证</Option>
                                                <Option value="军警官证">军警官证</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="证件号码">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="单位名称">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="联系电话">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="联系地址">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="查阅日期">
                                            <Input />
                                        </FormItem>
                                    </div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <div className={styles.right}>
                                            <AvatarView avatar={this.getAvatarURL()} methodName="读取身份证" />
                                        </div>

                                        <div className={styles.right} style={{ marginTop: '50px' }}>
                                            <AvatarView avatar={this.getAvatarURL()} methodName="拍照" />
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="被查阅人信息" bordered={false} style={{ height: '700px' }}>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <FormItem {...formItemLayout} label="被查阅人信息">
                                            <Checkbox onChange={() => console.log("change")}>与查阅人相同</Checkbox>
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="与查阅人关系">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="姓名">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="性别">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="民族">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="证件类型">
                                            <Select placeholder="--请选择--">
                                                <Option value="身份证">身份证</Option>
                                                <Option value="居民户口簿">居民户口簿</Option>
                                                <Option value="临时身份证">临时身份证</Option>
                                                <Option value="军警官证">军警官证</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="证件号码">
                                            <Input />
                                        </FormItem>
                                    </div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <div className={styles.right}>
                                            <AvatarView avatar={this.getAvatarURL()} methodName="读取身份证" />
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', float: 'left' }}>
                                        <FormItem {...formItemLayout1} label="利用内容">
                                            <TextArea
                                                style={{ minHeight: 80, maxHeight: 160 }}
                                                rows={4}
                                            />
                                        </FormItem>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ margin: '10px' }}>
                            <Col span={12}>
                                <Card title="利用情况" bordered={false} style={{ height: '400px' }}>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <FormItem {...formItemLayout} label="利用类别">
                                            <Select placeholder="--请选择--">
                                                <Option value="档案">档案</Option>
                                                <Option value="资料">资料</Option>
                                                <Option value="现行文件">现行文件</Option>
                                                <Option value="电子文件">电子文件</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="利用方式">
                                            <Select placeholder="--请选择--">
                                                <Option value="电子查阅">电子查阅</Option>
                                                <Option value="实体借阅">实体借阅</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="专题类别">
                                            <Select placeholder="--请选择--">
                                                <Option value="知青档案">知青档案</Option>
                                                <Option value="婚姻登记">婚姻登记</Option>
                                                <Option value="精简下放">精简下放</Option>
                                                <Option value="企业招工">企业招工</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="是否查到">
                                            <Select placeholder="--请选择--">
                                                <Option value="是">是</Option>
                                                <Option value="否">否</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="满意度">
                                            <Select placeholder="--请选择--">
                                                <Option value="非常满意">非常满意</Option>
                                                <Option value="满意">满意</Option>
                                                <Option value="不满意">不满意</Option>
                                            </Select>
                                        </FormItem>
                                    </div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <FormItem {...formItemLayout} label="所属时期">
                                            <Select placeholder="--请选择--">
                                                <Option value="建国后档案">建国后档案</Option>
                                                <Option value="建国前档案">建国前档案</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="利用目的">
                                            <Select placeholder="--请选择--">
                                                <Option value="工作查考">工作查考</Option>
                                                <Option value="编史修志">编史修志</Option>
                                                <Option value="学术研究">学术研究</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="所属全宗">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="是否完成">
                                            <Select placeholder="--请选择--">
                                                <Option value="未完成">未完成</Option>
                                                <Option value="已完成">已完成</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="利用档号">
                                            <Input />
                                        </FormItem>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="数量统计" bordered={false} style={{ height: '400px' }}>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <FormItem {...formItemLayout} label="人次">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="件次">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="影印页数">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="证明份数">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="音视频">
                                            <Input />
                                        </FormItem>
                                    </div>
                                    <div style={{ width: '50%', float: 'left' }}>
                                        <FormItem {...formItemLayout} label="卷次">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="复印页数">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="摘录页数">
                                            <Input />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="复制电子件数">
                                            <Input />
                                        </FormItem>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <div style={{ textAlign: "center" }}>
                            <Button onClick={validate} loading={submitting}>保存</Button>
                            <Button>重置</Button>
                            <Button>保存并打印</Button>
                            <Button>分配自助查档账号</Button>
                            <Button>保存并提交审核</Button>
                            <Button>满意度评价</Button>
                        </div>
                    </Form>
                </div>
            </PageHeaderWrapper>
        );
    }
}