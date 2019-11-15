# Petful Application
## Authored By: Steven Bull and Joey Romo
## EI-Cohort-34

### Endpoints
Both endpoints support GET and DELETE requests. Data is in a Queue structure, DELETE requests will dequeue from the beginning.
For dog data:
/api/dog/adopt

For cat data:
/api/cat/adopt

### Returned data is formatted like: 
[
  {
      "imageURL":
        "https://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg",
      "imageDescription":
        "A smiling golden-brown golden retreiver listening to music.",
      "name": "Zeus",
      "sex": "Male",
      "age": 3,
      "breed": "Golden retriever",
      "story": "Owner passed away."
    }
]