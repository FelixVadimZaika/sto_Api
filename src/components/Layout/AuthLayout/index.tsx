import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <>
            <div className="vh-100">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-6">
                            <div className="card rounded-3 shadow-sm">
                                <div className="card-body p-5">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthLayout;