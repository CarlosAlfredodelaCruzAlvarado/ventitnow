/**checkpoint todo esta bien aqui */
'use client';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import GoToTopButton from './components/GoToTopButton';
import axios from 'axios';

// Define las interfaces
interface Comment {
  id: number;
  user: string;
  text: string;
}

interface Complaint {
  id: number;
  title: string;
  description: string;
  userName: string;
  gender: string;
  age: number;
  problem_date: string;
  category: string;
  comments: Comment[];
}

export default function Home() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isDateAsc, setIsDateAsc] = useState(true); // Estado para controlar la dirección del orden por fecha
  const [isCommentsAsc, setIsCommentsAsc] = useState(true); // Estado para controlar la dirección del orden por comentarios

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('https://djagodeploy.onrender.com/api/complaints/');
        setComplaints(response.data);
      } catch (error) {
        console.error('¡Hubo un error al obtener las quejas!', error);
      }
    };

    fetchComplaints();
  }, []);

  const sortByDate = () => {
    const sorted = [...complaints].sort((a, b) => {
      return isDateAsc
        ? new Date(a.problem_date).getTime() - new Date(b.problem_date).getTime() // Ascendente
        : new Date(b.problem_date).getTime() - new Date(a.problem_date).getTime(); // Descendente
    });
    setComplaints(sorted);
    setIsDateAsc(!isDateAsc); // Alterna la dirección de la ordenación
  };

  // Ordenar por comentarios con alternancia
  const sortByComments = () => {
    const sorted = [...complaints].sort((a, b) => {
      return isCommentsAsc
        ? a.comments.length - b.comments.length // Ascendente
        : b.comments.length - a.comments.length; // Descendente
    });
    setComplaints(sorted);
    setIsCommentsAsc(!isCommentsAsc); // Alterna la dirección de la ordenación
  };

  const sortByRandom = () => {
    const shuffled = [...complaints].sort(() => Math.random() - 0.5);
    setComplaints(shuffled);
  };

  return (
    <div>
      <Navbar
        onSortByDate={sortByDate}
        onSortByComments={sortByComments}
        onSortByRandom={sortByRandom} onOpenModal={function (...args: any[]) {
          throw new Error('Function not implemented.');
        } }      />
      <Main complaints={complaints} />
      <GoToTopButton />
    </div>
  );
}
