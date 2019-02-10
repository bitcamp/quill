import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { addValidationRule } from 'formsy-react';
import { Form } from 'formsy-semantic-ui-react';
import { Label, Button } from 'semantic-ui-react';
import DefaultForm from '../util/DefaultForm';
import { Header } from 'semantic-ui-react';

const phoneNumberRegex
  = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

addValidationRule('isPhoneNumber', (_, value) => {
  if (value && value.length < 10) return false;
  return phoneNumberRegex.test(value);
});

const label = <Label color="red" pointing />
const leftLabel = <Label color="red" pointing="left" />;
const checkboxErrors = { isTrue: 'You must agree to this condition' };
const headerProps = { as: 'h2', color: 'blue', textAlign: 'center' };

const genderOptions = [
  { text: 'Male', value: 'M' },
  { text: 'Female', value: 'F' },
  { text: 'Non-binary', value: 'N' },
  { text: 'Other', value: 'O' },
  { text: 'Prefer not to answer', value: 'P' },
];

const schoolYearOptions = [
  { text: 'High School', value: 'High-School' },
  { text: 'Freshman', value: 'Freshman' },
  { text: 'Sophomore', value: 'Sophomore', },
  { text: 'Junior', value: 'Junior', },
  { text: 'Senior', value: 'Senior', },
  { text: 'Graduate Student', value: 'Grad-Student' },
  { text: 'Graduated', value: 'Graduated' },
]

const dietaryOptions = [
  { text: 'Halal', value: 'halal' },
  { text: 'Kosher', value: 'kosher' },
  { text: 'Vegan', value: 'vegan', },
  { text: 'Vegetarian', value: 'vegetarian' },
  { text: 'Gluten-free', value: 'gluten-free' },
  { text: 'Nut Allergy', value: 'nut-allergy' },
];

const workshopOptions = [
  { text: 'iOS', value: 'ios' },
  { text: 'Android', value: 'android' },
  { text: 'Mixed/Augmented/Virtual Reality', value: 'xr' },
  { text: 'Web Development', value: 'career' },
  { text: 'Application Design', value: 'appdesign' },
  { text: 'Application Creation Cycle', value: 'appcreation' },
];

const employmentOptions = [
  { text: 'Yes, internship', value: 'internship' },
  { text: 'Yes, full-time', value: 'full-time' },
  { text: 'No', value: 'none' },
]

const personalInfo = [
  <Header {...headerProps} content='Personal Details' />,
  <Form.Input fluid required name="firstName" label="First Name" />,
  <Form.Input required name="lastName" label="Last Name" />,
  <Form.Select required name="gender" label="Gender"
    options={genderOptions} />,
  <Form.Input required name='phoneNumber'
    label='Phone Number (xxx) xxx-xxxx'
    errorLabel={label}
    validations='isPhoneNumber'
    validationErrors={{
      isDefaultRequiredValue: 'This field is required',
      isPhoneNumber: 'Please enter a valid phone number'
    }} />,
  <div style={{marginBottom: 5}}>
    <div><strong>Age Requirement*</strong></div>
    Because of limitations imposed by UMD, we are not allowed to host non-UMD minors (those under 18). We will be checking ID.{' '}
    <strong>If you are a minor not currently attending UMD, you will be turned away at the door.</strong>{' '}
    Checking the box below confirms that you are or will be 18 years or older by April 12th, 2019, or currently attend the University of Maryland.
  </div>,
  <Form.Checkbox name='adult'
    label='I am or will be 18 years or older by April 12, 2019 or currently attend the University of Maryland'
    validations='isTrue'
    errorLabel={leftLabel}
    validationErrors={checkboxErrors} />,
  <Form.RadioGroup required name="shirtSize" label="Unisex T-Shirt Size" >
    <Form.Radio label="XS" value="XS"/>
    <Form.Radio label="S" value="S"/>
    <Form.Radio label="M" value="M"/>
    <Form.Radio label="L" value="L"/>
    <Form.Radio label="XL" value="XL"/>
    <Form.Radio label="XXL" value="XXL"/>
  </Form.RadioGroup>,
  <Form.TextArea name='organization'
    label='What organization(s) are you representing, if any?'
    placeholder='Companies, Clubs, Non-profits, etc.' />,
]

const emergencyContact = [
  <Header {...headerProps} content='Emergency Contact' />,
  <Form.Input required name='emergencyContact.name' label='Contact Name' />,
  <Form.Input required name='emergencyContact.relationship' label='Relationship to You' />,
  <Form.Input required name='emergencyContact.cellNumber'
    label='Cell Number (xxx) xxx-xxxx'
    errorLabel={label}
    validations='isPhoneNumber'
    validationErrors={{
      isDefaultRequiredValue: 'This field is required',
      isPhoneNumber: 'Please enter a valid phone number'
  }} />,
  <Form.Input required name='emergencyContact.workNumber'
    label='Work Number (xxx) xxx-xxxx'
    errorLabel={label}
    validations='isPhoneNumber'
    validationErrors={{
      isDefaultRequiredValue: 'This field is required',
      isPhoneNumber: 'Please enter a valid phone number'
    }} />,
];

const schoolInformation = (schoolOptions) => [
  <Header {...headerProps} content='School Information' />,
  <Form.Select search required name='school' 
    label='What school do you attend?' 
    options={schoolOptions} />,
  <Form.Select required name='schoolYear'
    label='What year are you in school?'
    options={schoolYearOptions} />,
  <Form.Input name='major' label='Major' />,
  <Form.Input name='minor' label='Minor' />,
];

const logistics = [
  <Header {...headerProps} content='Logistics' />,
  <Form.Dropdown multiple name='dietaryRestrictions' 
    label='Dietary Restrictions'
    placeholder='Dietary Restrictions'
    options={dietaryOptions} />,
  <Form.Checkbox name='needsReimbursement'
    label='Do you need travel reimbursement to/from the event?' />,
  <Form.Input name='reimbursementOrigin'
    label='If so, where are you traveling from?' />,
];

const bitcamp = [
  <Header {...headerProps} content='Why Bitcamp?' />,
  <Form.RadioGroup required name='amtHackathons' label='How many hackathons have you been to?'>
    <Form.Radio label='None' value='0' />
    <Form.Radio label='1-5' value='1-5' />
    <Form.Radio label='6 or more' value='6+' />
  </Form.RadioGroup>,
  <Form.TextArea name='whyBitcamp'
    label="Why do you want to attend Bitcamp?" />,
  <Form.TextArea name='buildBitcamp'
    label='What are you planning to build at Bitcamp?' />,
  <Form.Dropdown multiple name='workshops' 
    label='Which workshops are you interested in attending (pick up to 3)'
    placeholder='Workshops'
    options={workshopOptions} />,
];

const professional = [
  <Header {...headerProps} content='Professional' />,
  <Form.Select name='interestedIn'
    label='Are you interested in employment opportunities?'
    options={employmentOptions} />,
  <strong>Resume*</strong>,
  <div style={{marginBottom: 16}}>
    <a target='_blank' href='https://www.dropbox.com/request/coJAsPaT5lCMut1TXpNJ'>
      Upload a resume
    </a>
    {' '}outlining any skills or experience you’d like to share. PDF preferred!
  </div>,
  <Form.Input name='github' label='Github' />,
  <Form.Input name='devpost' label='Devpost' />,
  <Form.Input name='website' label='Website' />,
];

const legal = [
  <Header {...headerProps} content='Legal' />,
  <Form.Checkbox required name="mlhCOC"
    validations="isTrue"
    errorLabel={leftLabel}
    validationErrors={checkboxErrors}
    label={<label>
      I have read and agree to the terms of the{' '} 
      <a target='_blank' href='http://static.mlh.io/docs/mlh-code-of-conduct.pdf'>
        Major League Hacking Code of Conduct.
      </a>
    </label>}
  />,
  <Form.Checkbox required name="mlhTAC"
    validations="isTrue"
    errorLabel={leftLabel}
    validationErrors={checkboxErrors}
    label={<label>
      I have read and agree to the terms of both the{' '}
      <a target='_blank' href='https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions'>
        MLH Contest Terms and Conditions
      </a>
      {' '}and the{' '}
      <a target='_blank' href='https://mlh.io/privacy'>
        MLH Privacy Policy.
      </a>
      {' '}Please note that you may receive pre and post-event informational e-mails and occasional messages about hackathons from MLH as per the MLH Privacy Policy.
    </label>}
  />,
  <Form.Checkbox required name="bitcampWaiver"
    validations="isTrue"
    errorLabel={leftLabel}
    validationErrors={checkboxErrors}
    label={<label>
      I have read and agree to the terms of the{' '}
      <a target='_blank' href='https://bit.camp/terms-code-waiver.pdf'>
        Bitcamp Terms, Code of Conduct, and Release Waiver.
      </a>
    </label>}
  />,
];

const additional = [
  <Header {...headerProps} content='Extra' />,
  <Form.TextArea name='additional'
    label='Is there anything else we should know?'
  />
];

@observer
class ApplicationForm extends Component {
  constructor(props) {
    super(props);
  }

  handleValidSubmit = async (formData) => {
    const success = this.props.onSubmit(formData);
    if (success) {

    }
  }

  render = () => (
    <DefaultForm 
      onValidSubmit={this.handleValidSubmit} 
      defaultValues={this.props.oldProfile}
    >
      {personalInfo}
      {emergencyContact}
      {schoolInformation(this.props.schoolOptions)}
      {logistics}
      {bitcamp}
      {professional}
      {legal}
      {additional}
      <Form.Button content="Submit Application" color="orange" />
    </DefaultForm>
  )
}

export default ApplicationForm;
