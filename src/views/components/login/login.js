import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/lib/text-field'
import asyncValidate from '../../../core/asyncValidate'
const validate = values => {
    const errors = {}
    const requiredFields = [ 'email', 'password' ]
    requiredFields.forEach(field => {
        if(!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const LoginForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="email" component={email =>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                errorText = {email.touched && email.error}
                {...email}
              />
            }/>
            </div>
            <div>
                <Field name="password" component={password =>
                  <TextField hintText = "Password"
                    floatingLabelText="Password"
                    errorText = {password.touched && password.error}
                    {...password}/>
                    }/>
            </div>
            <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'loginForm',  // a unique identifier for this form
    validate,
    asyncValidate
})(LoginForm)
