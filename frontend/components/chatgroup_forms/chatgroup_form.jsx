import React from 'react'

import FormFullField from '../modules/form_full_field'
import { ErrorsList } from '../modules/jsx_lists'

class ChatgroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: {
        name: '',
      },
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.props.clearErrors()
    }
  }

  handleChange(field) {
    return e => {
      const team = Object.assign(
        this.state.team,
        {[field]: e.target.value}
      )
      this.setState({ team })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state.team)
      .then(() => this.props.history.push('/messages'))
  }

  render() {
    const {
        type, headingContent, submitContent, nameErrors, hasNameErrors,
        clearErrors, action
      } = this.props
    const { team } = this.state

    const nameErrorsList = makeErrorsList(nameErrors);

    return (
      <div className='chatgroup_form_view'>
        <div className="l-form_container l-middle">

          <h1
            className="form_container__header">
            {headingContent}
          </h1>

          <form
            className='form'
            onSubmit={this.handleSubmit}
            >

            <FormFullField
              labelVal='name'
              hasErrors={hasNameErrors}
              inputType='text'
              onChange={this.handleChange('name')}
              inputVal={team.name}
              errorsList={usernameErrorsList}
              tipValidation={isInvalidUsername}
            >

              {
                type === 'signup' &&
                <span>
                  Please choose a username that is all lowercase,
                  containing only letters, numbers, periods, hyphens,
                  and underscores.
                </span>
              }

            </FormFullField>

            <FormFullField
              labelVal='password'
              hasErrors={hasPasswordErrors}
              inputType='password'
              onChange={this.handleChange('password')}
              inputVal={this.state.password}
              errorsList={passwordErrorsList}
              tipValidation={isInvalidPassword}
            >

            {
              type === 'signup' &&
              <span>
                Passwords must be at least 6 characters long,
                and can't be things like <em>password</em>,
                <em>123456</em>, or <em>abcdef</em>.
              </span>
            }

            </FormFullField>

            <input
              className='form_field__submit form_field__submit--wide'
              type='submit'
              value={`${submitContent} →`}
              />
            <ul>
              { generalErrorsList }
            </ul>

          </form>

        </div>
      </div>
    )
  }
}



export default ChatgroupForm;
