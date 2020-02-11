import React from 'react';
import {ReactComponent as ButtonPlus} from '../../assets/images/buttonplus.svg'
import './ButtonComponent.css'

 const CreateButton =(props) =>( 
      <button className="RoundAddButton" onClick={props.onClick}>
        < ButtonPlus/>
      </button>
   );

export default CreateButton;