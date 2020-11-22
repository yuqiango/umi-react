import React, { Component } from 'react';
import styles from './index.less';
/*
参数
title: 卡片介绍
imh: 卡片封面
tip: 卡片标签
*/
class Card extends Component {
    constructor() {
        super(...arguments),
        this.state = {
            markClass: styles.mark,
            tipStyle: {
                opacity: 1
            }
        }
    }
    componentDidMount() {
    }
    timer = null
    handleMouseEnter = () => {
        this.timer = setTimeout(() => {
            this.setState({
                markClass: `${styles.mark} ${styles.markEnter}`,
                tipStyle: {
                    opacity: 0
                }
            })
        }, 500);
    }
    handleMouseLeave = () => {
        clearTimeout(this.timer);
        this.setState({
            markClass: `${styles.mark} ${styles.markLeave}`,
            tipStyle: {
                opacity: 1
            }
        })
    }
    render() {
        const { title, img, tip, className, mark, onClick } = this.props;
        const { markClass, tipStyle } = this.state;
        return (
            <div className={`${styles.card} ${className}`} onClick={onClick}>
                <div className={styles.imgBox} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <div className={markClass} ref='mark'>{mark}</div>
                    <img src={img} className={styles.img} />
                    <span className={styles.tip} ref='tip' style={tipStyle}>{tip}</span>
                    <span className={styles.play}>
                        <i className={`icon iconfont icon-bofang2`}></i>
                    </span>
                </div>
                <p>
                    {title}
                </p>
            </div>
        )
    }
}

export default Card;