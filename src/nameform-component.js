import React from 'react'

export class NameFormComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.onNameSubmitted) {
      this.props.onNameSubmitted(this.state.value)
    }
  }

  render() {
    return (
      <div>
        <h2>You Made it to the Highscores</h2>
      <form onSubmit={(event) => {return this.handleSubmit(event)}}>
        <label>
          Enter Name: 
          <input type="text" value={this.state.value} onChange={(event) => {return this.handleChange(event)}} />
        </label>
      </form>
      </div>
    );
  }
}