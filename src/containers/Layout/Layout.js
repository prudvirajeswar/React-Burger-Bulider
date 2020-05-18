import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer : !prevState.showSideDrawer}
        } );
    }

    render() {
        return (
            <Aux>
                <div>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer
                        closed={this.sideDrawerClosedHandler} 
                        open = {this.state.showSideDrawer} />
                </div>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
}

export default Layout;