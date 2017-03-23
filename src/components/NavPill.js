import React from 'react';

const NavPill = React.createClass({
  render () {
    return <div className='nav-partial' style={this.props.style}
      onClick={() => this.props.setCal(this.props.pillName)}>
    {/*  {this.props.pillName} - {this.props.currentCal.start.toString()} */}
    {this.props.pillName}
    </div>
  }
});

export default NavPill;
