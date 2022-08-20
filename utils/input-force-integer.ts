import React from 'react';

export const inputForceInteger = (e: React.FormEvent<HTMLInputElement>) =>
  ((e.target as HTMLInputElement).value = (
    e.target as HTMLInputElement
  ).value.replace(/[^0-9]/, ''));
