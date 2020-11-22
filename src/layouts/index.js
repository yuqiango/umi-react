import { Layout } from 'antd';
import LeftMenu from "./slider/index2";
import TagGroup from './tag';
import styles from './index.less';
import HeaderBox from './header';

const Layouts = ({ children }) => {
    const { Header, Footer, Sider, Content } = Layout;
    return (
        <Layout className='layout_main'>
            <Header className='layout_header'>
                <HeaderBox />
            </Header>
            <Layout>
                <Sider width='200px'>
                    <LeftMenu></LeftMenu>
                </Sider>
                <Content>
                    <div className={styles.tagMenu}>
                        <div></div>
                        <TagGroup />
                    </div>
                    <div className={styles.container}>
                        {children}
                    </div>
                </Content>
            </Layout>
            <Footer className='layout_footer'>Footer</Footer>
        </Layout>
    );
 
}    

export default Layouts;