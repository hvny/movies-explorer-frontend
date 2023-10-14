import {useState, useCallback } from "react";

function useForm() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
  
    function handleChange(evt) {
      const { name, value } = evt.target;
      const error = evt.target.validationMessage;
      const isValid = evt.target.closest('form').checkValidity();
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: error });
      setIsValid(isValid);
    };
  
    const resetForm = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
    );
  
    return { values, handleChange, errors, isValid, resetForm };
}

export default useForm;