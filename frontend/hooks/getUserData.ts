import { useState, useEffect } from 'react';
import api from '@/api/client';
import { User } from '@/services/auth/types';
import { auth } from '@/firebase';

export default function getUserData() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = auth.currentUser?.uid;
      try {
        if (!uid) throw new Error('Nenhum usuário autenticado');
        const response = await api.get(`/users/${uid}`);
        if (response.status === 200) {
          const resp_obj = response.data as User;
          setUser(resp_obj);
        };
      } catch (err) {
        setError(err.message || 'Falho ao buscar dados do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { user, loading, error };
}