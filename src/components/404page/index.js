import React from 'react';
import { Link} from 'react-router-dom';
import Header from "../Header";
import PrimaryButton from '../PrimaryButton';

const WrongUrl = () => {
    return (
        <div>
            <Header />
            <div>
                <div>
                    <div></div>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        <Link to="/"><PrimaryButton label="Home" /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WrongUrl