import { reduxForm, Field } from 'redux-form'
import {
    TextField
} from 'redux-form-material-ui'
const validate = values => {
    const errors = {}
    const requiredFields = [ 'email', 'password' ]
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}
class FormLogin extends Component {
    componentDidMount() {
        this.refs.email           // the Field
            .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
            .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
            .focus()                // on TextField
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name="email" component={TextField} hintText="Email" floatingLabelText="Email" ref="email" withRef/>
                </div>
                <div>
                    <Field name="password" component={TextField} hintText="Password" floatingLabelText="Password"
                           ref="password" withRef/>
                </div>
                <div>
                    <button type="submit" disabled={pristine || submitting}>Submit</button>
                </div>
            </form>
        )
    }
}

// Decorate with redux-form
FormLogin = reduxForm({
    form: 'formLogin',
    initialValues: {
    },
    validate
})(FormLogin);

export default FormLogin
