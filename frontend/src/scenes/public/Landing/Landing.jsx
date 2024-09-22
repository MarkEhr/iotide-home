import React from 'react';
import './Landing.scss';
import Button from "../../../components/Button/Button";
import {Link} from "react-router-dom";
import {paths} from "../../../services/routes/mainRoutes";
import BlurBall from "../../../components/BlurBall/BlurBall";
const Landing = () => {

    return (
        <div className={"Landing"}>

            <BlurBall />

            <div className='content'>
                <h1 className='title'>
                    Casa Anáhuac
                </h1>

                <Link to={paths.login}>
                    <Button>
                        Login
                    </Button>
                </Link>
            </div>

        </div>
    );
};

export default Landing;
