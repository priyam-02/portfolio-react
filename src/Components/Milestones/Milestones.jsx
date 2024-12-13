import React from 'react'
import './Milestones.css'
import theme_pattern from '../../assets/theme_pattern.svg';
import Milestones_Data from '../../assets/milestones_data';


const Milestones = () => {
  return (
    <div id='milestones' className='milestones'>
        <div className="title-box">
            <h1>My Milestones</h1>
            <img src={theme_pattern} alt="" />
        </div>
        <div className="milestones-container">
            {Milestones_Data.map((milestone, index) => {
                return (
                    <div className="milestones-format" key={index}>
                        <h3>{milestone.s_year}</h3>
                        <h2>{milestone.s_name}</h2>
                        <p>{milestone.s_desc}</p>
                    </div>
                )
            })}

        </div>
    </div>
  )
}

export default Milestones