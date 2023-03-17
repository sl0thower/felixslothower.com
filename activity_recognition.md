# Activity Recognition

*Classification of activities using IMU data collected from a wristwatch and mobile phone.*

### Background

This project took place during my junior year at the University of California - Irvine and was meant to simulate a real world machine learning task from start to finish. The dataset was provided by the universities public machine learning repository and required significant manipulation before it was in workable condition. The aim of the project was to use accelerometer and gyroscopic data from a users wristwatch and mobile phone to estimate their current activity. Data from both devices was sampled at a rate of 20Hz. The dataset included recordings from 51 different test subjects each conducting 18 different activities for three minutes a piece. Different classical machine learning models were evaluated including : k-Nearest Neighbors, Random Forests, Support Vector Machines and Linear and Quadratic Discriminant Analysis.

Below are some illustrations of how the data is distributed for different activities and users. Both plots only show data for the x-axis acceleration of the users mobile phone, which is only one of twelve different datapoints collected at each instance in time. Tall peaks in both plots indicate a resting state at a particular orientation. When the distribution is spread thin it indicates the user was moving across these states of acceleration throughout the activity. It is not clear from this data alone how the algorithm would separate each activity but it should help to give a better understanding of what we are dealing with.

<center>
<img src=".\media\portfolio\activity_recognition\all_actvts.svg">
</center>

Below we see data for one activity from twenty different users. Standing still is sure to give us a concentrated set of acceleration data however each user has their phone oriented relative to their body in different ways. From this it should be clear that the exact mobile phone orientation will be less significant than the relative changes in acceleration when it comes to predicting various activities. 

<center>
<img src=".\media\portfolio\activity_recognition\user_standing.svg">
</center>

### Data Pre-Processing

Since I was limited to the use of traditional machine learning models

### Learning



### Results



### More Figures



#### The report I submitted for those interested
