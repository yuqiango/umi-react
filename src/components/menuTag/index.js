import styles from './index.less';
import { withRouter } from 'react-router-dom';
import {
   CloseOutlined
} from '@ant-design/icons';

const MenuTag = ({ children, onClick, onClose, location, data}) => {
    return (
        <div
            className={`${styles.tag} ${data.path == location.pathname.split('/')[1] ? styles.active: null}`}
            onClick={onClick}
        >
            {children}
            <CloseOutlined onClick={onClose} className={styles.close} />
        </div>
    )
}

export default withRouter(MenuTag);