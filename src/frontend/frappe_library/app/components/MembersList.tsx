'use client';
import React, { useEffect, useState, useCallback } from 'react';  
import api from '../api';  
import ReactPaginate from 'react-paginate';  
import styles from '../styles/MembersList.module.css';  
import { Member } from '../types';  
  
const MembersList = () => {  
    const [members, setMembers] = useState<Member[]>([]);  
    const [totalPages, setTotalPages] = useState(0);  
    const [currentPage, setCurrentPage] = useState(0);  
  
    const membersPerPage = 10;  
  
    const getMembers = useCallback(async (page = 1) => {  
        try {  
            const response = await api.get(`/members/?page=${page}`);  
            setMembers(response.data.data);  
            setTotalPages(response.data.total_pages);  
            setCurrentPage(response.data.current_page);  
        } catch (error) {  
            console.error('Error while fetching members:', error);  
        }  
    }, []);  
  
    useEffect(() => {  
        getMembers();  
    }, [getMembers]);  
  
    const changePage = ({ selected }: { selected: number }) => {  
        getMembers(selected + 1);  
    };  
  
    const displayMembers = (  
        <div className={styles.membersGrid}>  
            {members.map((member: Member) => (  
                <div key={member.member_id} className={styles.card}>  
                    <h2 className={styles.detailBox}><b>First Name: </b>{member.first_name}</h2>  
                    <h2 className={styles.detailBox}><b>Last Name: </b>{member.last_name}</h2>  
                    <p className={styles.detailBox}><b>Email: </b>{member.email}</p>  
                    {member.on_debt ? 
                    <button className={styles.onDebtButton}>Member Debt {'>'} 500</button> :   
                    <button className={styles.notOnDebtButton}>Member Debt {'<'} 500</button>
                    }
                </div>  
            ))}  
        </div>  
    );  
  
    return (  
        <div>  
            <h1 className={styles.title}>Members</h1>  
            {displayMembers}  
            <ReactPaginate  
                previousLabel={"Previous"}  
                nextLabel={"Next"}  
                pageCount={totalPages}  
                onPageChange={changePage}  
                containerClassName={styles.paginationButtons}  
                previousClassName={styles.previousButton}  
                nextClassName={styles.nextButton}  
                disabledClassName={styles.paginationDisabled}  
                activeClassName={styles.paginationActive}  
            />  
        </div>  
    );  
};  
  
export default MembersList;  
