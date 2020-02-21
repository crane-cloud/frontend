import React from 'react';
import './AddClusterPage.css';
import InputText from '../InputText';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';


class AddClusterPage extends React.Component {
  render() {
    return (
      <div className="AddPageContainer">
        <div className="AddPageContent">
          <div className="AddHeading">
            Add a cluster
          </div>
          <div className="AddFormInputs">
            {/* Input fields */}
            <InputText
              placeholder='Host'
              name='host'
              value=""
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <InputText
              placeholder='Token'
              name='token'
              value=""
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <InputText
              placeholder='Name'
              name='host'
              value=""
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <InputText
              placeholder='Description'
              name='host'
              value=""
              onChange={e => {
                this.handleChange(e);
              }}
            />

            <div className='AddButtons'>
              <div className="AddBtn">
                <PrimaryButton 
                  label='ADD'
                  onClick={this.handleSubmit}/>
              </div>
              <div className="AddCancelBtn">
                <SecondaryButton className="AddCancelBtn"
                  label='CANCEL'
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default AddClusterPage;