import React, {Component} from "react"
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom"

import {
    TabBar
} from 'antd-mobile'
import "./nav-footer.less"

class NavFooter extends Component {
    static propTypes = {
        listNav: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }

    render() {
        let {listNav}=this.props
        listNav = listNav.filter(val => !val.hide)
        console.log("listNav", listNav)
        const path = this.props.location.pathname
        return (
            <TabBar unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    tabBarPosition="bottom">
                {
                    listNav.map(val => (<TabBar.Item title={val.text}
                                                     key={val.path}
                                                     badge={val.path === "/message" ? this.props.unReadCount : 0}
                                                     icon={{uri: require(`./images/${val.icon}.png`)}}
                                                     selectedIcon={{uri: require(`./images/${val.icon}-selected.png`)}}
                                                     selected={val.path === path}
                                                     onPress={() => {
                                                         this.props.history.replace(val.path)
                                                     }}>

                    </TabBar.Item>))
                }
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)