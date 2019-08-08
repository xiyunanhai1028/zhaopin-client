import React, {Component} from "react"
import QueueAnim from 'rc-queue-anim'
import PropTypes from "prop-types"
import {withRouter} from "react-router-dom"
import {
    WingBlank,
    WhiteSpace,
    Card
} from "antd-mobile"
class UserList extends Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    }


    render() {
        const {userList}=this.props
        // console.log("userList---:", userList)
        return (
            userList.map((val, index) =>
                <WingBlank size="lg" key={val._id}>
                    <QueueAnim type="scale">
                        <WhiteSpace size="lg"/>
                        <Card onClick={() => this.props.history.push(`/chat/${val._id}`)}>
                            <Card.Header
                                thumb={val.header ? require(`../../assets/images/${val.header}.png`) : null}
                                extra={<span>{val.username}</span>}
                            />
                            <Card.Body>
                                <div>职位：{val.post}</div>
                                <WhiteSpace/>
                                {val.company ? <div>公司：{val.company}</div> : null}
                                <WhiteSpace/>
                                {val.salary ? <div>薪资：{val.salary}</div> : null}
                                <WhiteSpace/>
                                <div>描述：{val.info}</div>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="lg"/>
                    </QueueAnim>

                </WingBlank>
            )
        )
    }
}

export default withRouter(UserList)
