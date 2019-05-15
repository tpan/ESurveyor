// Contains logic to render a single label and text input
// F.E email field
// Child of reduxForm field class, access to event handler props 👌
import React from 'react'

export default ({ input, label, meta: { touched, error } }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '20px' }} />
			<div className='red-text' style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	)
}
