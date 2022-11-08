import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "../Avatar";
import styles from "./UserProfile.module.css";
import InformationBar from "../../components/InformationBar";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BlackInputText from "../BlackInputText";
import InputPassword from "../InputPassword";
import Spinner from "../../components/Spinner";
import PrimaryButton from "../PrimaryButton";
import getUserDetail from "../../redux/actions/userDetails";
import BackButton from "../../assets/images/backButton.svg";
import {updateProfile , clearUpdateProfileState} from "../../redux/actions/updateProfile";
import "../../index.css";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";


class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    const { name } = props.user
    this.initialState = {
     username:name,
     currentPassword:"",
     newPassword:"",
     confirmPassword:"",
    };
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this)
    this.handleNameEdit = this.handleNameEdit.bind(this)
  }

  componentDidMount() {
    const { getUserDetail, data } =
      this.props;
      clearUpdateProfileState();
      getUserDetail(data.id);

  }
  handleChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  componentDidUpdate(prevProps) {
    const {
      profileUpdated, user
    } = this.props;
    if (profileUpdated !== prevProps.profileUpdated) {
      //log user out 
      localStorage.clear();
      window.location.href = "/";
    }
    if (user !== prevProps.user) {
      this.setState({username:user.name})
    }
  }

  handleNameEdit(){
    const { updateProfile, user } =
    this.props;
    const {username} = this.state
   if(user.name !== username){
     const update ={
       name: username
     }
      updateProfile(user.id, update)
   }  
  }


  render() {
    const { username,newPassword,confirmPassword,currentPassword } = this.state;
    const {
      user,
      isFetching,
      isFetched,
      profileUpdating
    } = this.props;

    return (
      <div className={styles.Page}>
          <div>
            <div className={styles.TopRow}>
              <Header />
              <InformationBar
                header="Profile"
              />
            </div>
            <div className={styles.MainColumn}>
              <Link
                  to={`/projects`}>
                    <img src={BackButton} alt="Back Button" />
                  </Link>
              {isFetching ? (
                <div className={styles.NoResourcesMessage}>
                  <div className={styles.SpinnerWrapper}>
                    <Spinner size="big" />
                  </div>
                </div>
              ) : isFetched ? (
                <div className={`${styles.ProjectList}  SmallContainer`}>
                  {isFetched &&(
                  <div className={styles.UserContainer}>
                    <section className={styles.ContainerSection}>
                      <div className={styles.HeaderSection}>
                        <div className={styles.SectionTitle}>Information</div>
                        <div className={styles.SectionSubTitle}>Your identity on crane cloud</div>
                      </div>
                      <aside>
                         <div className={styles.EmailHead}>
                         <Avatar name={user.name} className={styles.UserAvatar}/>
                         {/* not editable */}
                         <div className={styles.InputDiv}>
                         Email
                         <BlackInputText 
                         className={styles.CustomInput}
                         name={user.email}
                         value={user.email}
                         />
                         </div>
                         </div>   
                         <div className={styles.InputDiv}>
                          Name
                         <BlackInputText
                          className={styles.CustomInput} 
                          placeholder=""
                           name="username"
                          value={username}
                          onChange={(e) => {
                             this.handleChange(e);
                         }}
                        />{user.name!==username?.trim() && <PrimaryButton
                         label= { profileUpdating ? <Spinner /> :"EDIT NAME"}
                         onClick={()=>{this.handleNameEdit()}}
                         className={styles.BackButton} 
                         />}
                         </div>  
                      </aside>
                    </section>
                    <section className={styles.ContainerSection}>
                      <div className={styles.HeaderSection}>
                        <div className={styles.SectionTitle}>Password</div>
                        <div className={styles.SectionSubTitle}>Change your password</div>
                      </div>
                      <aside>
                         <div className={styles.InputDiv}>
                         Current password
                         <InputPassword
                          className={styles.CustomPasswordInput} 
                          placeholder=""
                           name="currentPassword"
                          value={currentPassword}
                          onChange={(e) => {
                             this.handleChange(e);
                         }}
                        />
                        <div className={styles.SectionSubTitle}> You should provide old password first</div>
                         </div>    
                         <div className={styles.InputDiv}>
                         New password
                         <InputPassword
                          className={styles.CustomPasswordInput} 
                          placeholder=""
                           name="newPassword"
                          value={newPassword}
                          onChange={(e) => {
                             this.handleChange(e);
                         }}
                        />
                         </div> 
                         <div className={styles.InputDiv}>
                         Confirm password
                         <InputPassword
                          className={styles.CustomPasswordInput} 
                          placeholder=""
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => {
                             this.handleChange(e);
                         }}
                        />
                         </div> 
                         {<div className={styles.ButtonDiv}>
                         {(newPassword !=="" && confirmPassword !=="" && currentPassword!=="") && <PrimaryButton
                         label= { profileUpdating ? <Spinner /> :"CHANGE PASSWORD"}
                         onClick={()=>{}}
                         className={styles.BackButton} 
                         />}
                         </div>} 
                      </aside>
                    </section>
                    <section className={styles.ContainerSection}>
                    <div className={styles.HeaderSection}>
                      <div className={styles.SectionTitle}>More information</div>
                      <div className={styles.SectionSubTitle}>More information about a user</div>
                    </div>
                    <aside>
                       <div className={styles.InputDiv}>
                       <div className={styles.SectionTitle}>Beta User</div>
                       <div className={user.is_beta_user ===true ?
                        styles.rowContentYes:styles.rowContentNo}>{user.is_beta_user ===true ? "Yes":"No"}</div>
                       </div>   
                       <div className={styles.InputDiv}>
                       <div className={styles.SectionTitle}>Credits</div>
                       <div className={styles.SectionSubTitle}>Assigned by Admin for billing purporses</div>
                       <div className={styles.RowContent}>{user.credits.length===0? "No credits":<div className={styles.CreditsContainer}> {user.credits[0].amount}
                       <div className={styles.CoinSize}>
                       <Coin/>
                       </div></div>}</div>
                       </div> 
                    </aside>
                  </section>
                  </div>)
                   }
                </div>
              ): null}
              
              {!isFetching && !isFetched && (
                <div className={styles.NoResourcesMessage}>
                  Oops! Something went wrong! Failed to retrieve user.
                </div>
              )}
            </div>
          </div>
     
        <div className={styles.FooterRow}>
          <div>
            Copyright {new Date().getFullYear()} Crane Cloud. All Rights
            Reserved.
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  getUserDetail: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userID: PropTypes.string,
    }).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  isFetched: PropTypes.bool,
  message: PropTypes.string,
  isFetching: PropTypes.bool,
  profileUpdated:PropTypes.bool,
  profileUpdating:PropTypes.bool,
  profileUpdateFailed:PropTypes.bool,
};

UserProfile.defaultProps = {
  user: {},
  message: "",
  isFetched: false,
  isFetching: false,
  profileUpdated:false,
  profileUpdating:false,
  profileUpdateFailed:false,
};

export const mapStateToProps = (state) => {
    const { data } = state.user;
  const { isFetching, user, isFetched,message } = state.userDetailReducer;
  const{profileUpdateFailed,
    profileUpdated,
    profileUpdating,
    errorMessage,
  }= state.updateProfileReducer;
  return {
    isFetching,
    user,
    isFetched,
    message,
    data,
    profileUpdateFailed,
    profileUpdated,
    errorMessage,
    profileUpdating,
  };
};

const mapDispatchToProps = {
  getUserDetail,
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
