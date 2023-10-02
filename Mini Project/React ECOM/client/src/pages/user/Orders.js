import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'

const Orders = () => {
    return (
        <>
            <Layout>

                <div className='container-flui p-3 m-3 dashboard'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <UserMenu />
                        </div>
                        <div className='col-md-9'>
                            <div className="card w-75 p-3">
                                <div className="form-container" style={{ marginTop: "-40px" }}>
                                    <h2>All Orders</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Orders