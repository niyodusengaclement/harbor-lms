import React from "react";
import '../assets/styles/components/inputField.scss';

export default ({type,id,name,selectOptions,label,checked, placeholder,className,required, handleChange}) => {
  placeholder = required ? `${placeholder} *` : placeholder; 
  let options;
  if(selectOptions){
     options = selectOptions.map(selectOption => (
      <option value={selectOption.value}> {selectOption.label}</option> 
    ))
  }
  return (
    <div>
      {
        type==='select' ? <select name={name} id={id} className={className} onChange={(event)=>handleChange(event.target)}> 
                              {options}
                          </select>
      : type==='checkbox' ? <div className={className}>
                               <input type={type} defaultChecked={checked ? 'checked' : ''} onChange={(event) => handleChange(event.target)}/>
                               <span>{label}</span>
                            </div>
        : <input type={type} id={id} name={name} placeholder={placeholder} className={className} onChange={(event)=>handleChange(event.target)}/> 
      }
    </div>
  );
};
