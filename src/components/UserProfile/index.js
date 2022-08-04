import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "../Avatar";
import styles from "./UserProfile.module.css";
import InformationBar from "../../components/InformationBar";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BlackInputText from "../BlackInputText";
import Spinner from "../../components/Spinner";
import PrimaryButton from "../PrimaryButton";
import getUserDetail from "../../redux/actions/userDetails";
import {updateProfile , clearUpdateProfileState} from "../../redux/actions/updateProfile";
import "../../index.css";
import { ReactComponent as Coin } from "../../assets/images/coin.svg";


class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    const { name } = props.user
    this.initialState = {
     username:name
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
      window.location.href = "/login";
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
    const { username } = this.state;
    const {
      user,
      data,
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
                header="User"
              />
            </div>
            <div className={styles.MainColumn}>
              <Link
                  to={`/projects`}><PrimaryButton label="BACK" className={styles.BackButton} /></Link>
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
                    <Avatar name={user.name} className={styles.UserAvatar}/>
                    <div className={styles.UserDetailContainer}>
                      <div className={styles.Row}>
                        <div className={styles.RowHeading}>Name:</div> 
                        <div className={styles.RowContent}>
                        <div  className={styles.SaveContainer} ><BlackInputText
                          required  
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
                          </div>
                         </div> 
                      <div className={styles.Row}><div className={styles.RowHeading}>Email:</div> 
                      <div className={styles.RowContent}>{user.email}</div>
                        </div>
                        {/**Username is un-editable, only name is */}
                        <div className={styles.Row}><div className={styles.RowHeading}>Username</div> 
                      <div className={styles.RowContent}>{data.name}</div>
                        </div>
                      <div className={styles.Row}><div className={styles.RowHeading}>Beta user:</div>
                      <div className={styles.RowContent}>{user.is_beta_user? "Yes":"No"}</div>
                        </div> 
                      <div className={styles.Row}><div className={styles.RowHeading}>Credits:</div>  
                      <div className={styles.RowContent}>{user.credits.length===0? "No credits":<div className={styles.CreditsContainer}> {user.credits[0].amount}
                       <div className={styles.CoinSize}>
                       <Coin/>
                       </div></div>}</div>
                      </div> 
                    </div>
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
