import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// <div>
//     <RaisedButton label="Default" style={style} />
//     <RaisedButton label="Primary" primary={true} style={style} />
//     <RaisedButton label="Secondary" secondary={true} style={style} />
//     <RaisedButton label="Disabled" disabled={true} style={style} />
//     <br />
//     <br />
//     <RaisedButton label="Full width" fullWidth={true} />
//   </div>

const NavPill = React.createClass({
      //    {/**/}
  render () {
    return <RaisedButton
              backgroundColor = {this.props.bgColor.color}
              label={this.props.pillName}
              onClick={() => this.props.setCal(this.props.pillName)} ></RaisedButton>
  }
});

export default NavPill;
