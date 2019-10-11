# Bluebeam Atlas Punch List

This application will display construction site punch list data on a map for review.

## Build Instructions


## Limitations

### A large number of punch list items will clutter the map and make it difficult to navigate. 
 - __Possible Solution__: Cluster the points when user is zoomed out, reveal individual points as user zooms in. 

### The data structure is superficial and error prone.
 - __Possible Solution__: I would flesh out the data structure, using lookups for disciplines and rooms. A relationship between disciplines and subcontractors is needed.


# Planning

## Must Have
 - Tests
 - Parameter based routing so that the URL can be used to filter the punch list items
 - Punch list items on a map
 - Previous and Next buttons to navigate between tasks

## Nice To Have
 - Make it pretty
 - Task list to accompany map
 - Search bar

## Future Iterations
 - Add task assignment capability
 - Explore clustering
 - User preferences for how to scroll through punch list
 - Add task at user location

## Tools
 - Javascript
 - React
 - React Router
 - Leaflet
 - Jest
 - Netlify

## Data
 ``` 
 [
	{
		"description": "string",
		"room": "string",
		"latLng": [
			32,
			-97
		],
		"discipline": "string",
		"due-date": "1/1/1900",
		"state": "string",
		"floor": 1
	}
]
 ```