import Tag from '@/components/menuTag';
import { connect } from 'dva';
import { history } from 'umi';

const TagGroup = ({ tagList, dispatch }) => {
    const hadnleClose = (e, item) => {
        e.stopPropagation(); 
        dispatch({
            type: 'account/delMenuTag',
            payload: item
        })    
    }
    const handleClick = (path) => {
        history.push('/' + path)
    }
    return(
        <>
            {
                tagList.map(item => {
                    return (
                    <Tag 
                        key={item.id}
                        data={item}
                        closable 
                        onClose={(e) => { hadnleClose(e, item) }}
                        onClick={() => { handleClick(item.path) }}
                    >
                        {item.title}
                    </Tag>
                    )
                })
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        tagList: state.account.menuTagList
    }
}

export default connect(mapStateToProps)(TagGroup);