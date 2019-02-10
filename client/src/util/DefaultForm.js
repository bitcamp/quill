import React from 'react';
import { observer } from 'mobx-react';
import { Form } from 'formsy-semantic-ui-react';

// this is a helper component that allows default values to be used with formsy-semantic-ui-react

const applyDefaults = (elements, defaults) => (
  React.Children.map(elements, ele => {
    let defaultValue;
    if (ele.props.name) {
      try {
        const levels = ele.props.name.split('.');
        defaultValue = defaults;
        levels.forEach(level => defaultValue = defaultValue[level]);
      } catch (e) {
        defaultValue = undefined;
      }
    }

    let newProps = {};
    if (ele.type === Form.Group) {
      newProps.children = applyDefaults(ele.props.children, defaults);
    } else if (ele.type === Form.Checkbox) {
      newProps.value = defaultValue
    } else if (ele.type === Form.RadioGroup) {
      newProps.defaultSelected = defaultValue
    } else if (ele.props.name) {
      newProps.defaultValue = defaultValue
    } else {
      return ele;
    }

    return React.cloneElement(ele, newProps);
  })
);

const DefaultForm = ({ defaultValues, children, ...formProps }) => {
  const childrenWithDefaults = applyDefaults(children, defaultValues);
  return <Form {...formProps} children={childrenWithDefaults} />;
};

export default observer(DefaultForm);
