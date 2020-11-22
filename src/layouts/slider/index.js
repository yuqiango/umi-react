import React, { Component } from 'react';
import { Menu, Slider } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { connect } from 'dva';

const { SubMenu } = Menu;

class LeftMenu extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            menuList: [],
            defaultOpenKeys: []
        }
    }
    handleClick = ({ item }) => {
        this.props.dispatch({
            type: 'account/saveMenuTag',
            payload: item.props.data
        })
        history.push(item.props.data.path);
    };
    componentDidMount() {
        fetch('/api/userInfo').then(response => response.json()).then(res => {
            if(res && res.status == 200) {
                this.setState({
                    menuList: res.data.sysMenu
                })
            }
        })
    }

    renderMenu = (item) => {
        if (item.children && item.children.length > 0) {
            return (
                <SubMenu
                    key={item.id}
                    title={item.title}
                >
                    {
                        item.children.map(item1 => {
                            return this.renderMenu(item1)
                        })
                    }
                </SubMenu>
            )

        } else {
            return (
                <Menu.Item key={item.id} data={item}>
                    <i className={`icon iconfont ${item.icon}`}></i>&#12288;{item.title}
                </Menu.Item>
            )
        }
    }

    render() {
        const { menuList } = this.state;
        return (
            <Menu
                onClick={this.handleClick}
                className='layout_subMenu'
                mode="inline"
            >
                {
                    menuList.map(item => {
                        return this.renderMenu(item)
                    })
                    
                }
            </Menu>
        );
    }
}

export default connect()(LeftMenu);