import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGoal, getGoals } from '../features/goals/goalSlice';
// import { toast } from 'react-toastify';

const GoalForm = () => {
  const [text, setText] = useState('');
  const { goals } = useSelector((state) => state.goals);
  console.log(goals);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoals());
    // if (isError) {
    //   toast.error(message);
    // }

    // dispatch(reset());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText('');
  };

  return (
    <>
      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='text'>Goal</label>
            <input
              type='text'
              name='text'
              id='text'
              placeholder='Add a Goal'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block' type='submit'>
              Add Goal
            </button>
          </div>
        </form>
      </section>
      {goals.map((goal) => (
        <div key={goal?.user._id}>
          <h1>{goal?.text}</h1>
          <p>{String(goal.createdAt).substring(10)}</p>
          <button className='btn btn-block'>Delete</button>
        </div>
      ))}
    </>
  );
};

export default GoalForm;
