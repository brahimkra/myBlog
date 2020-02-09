import React, { useState } from 'react';
import Blog from '../../components/blog';

import blogImg from '../../assets/images/blog.jpg';
import { connect } from 'react-redux';
const ListBlogs = props => {
	const uniqueBlogs = Array.from(new Set(props.allBlogs.map(c => c.category))).map(category => {
		return props.allBlogs.find(a => a.category === category);
	});
	console.log('filteredRedundunt', uniqueBlogs);
	const [selectedCategory, setCategory] = useState('');
	const [searchInput, setInput] = useState('');
    const search=(query,data)=>{
		let newFilteredData=[];
		if(query.category && query.input){
			newFilteredData = data.filter(c => c.category === query.category && c.title.toLowerCase().includes(query.input.toLowerCase())  );
		}else if(query.category ){
			newFilteredData = data.filter(c => c.category === query.category);
		}else newFilteredData = data.filter(c => c.title.toLowerCase().includes(query.input.toLowerCase())  );
		

          return newFilteredData;
	}
	const handleSelect = e => {
	
			setCategory(e.target.value);
	};
	const handleSearch = e => {
		setInput(e.target.value);
	};
	const query={category:selectedCategory,input:searchInput};
    const data=search(query,props.allBlogs);
	if (!props.allBlogs) return <div></div>;
	return (
		<div>
			<div class="form-group">
				<input
					className="form-control mr-sm-2"
					type="search"
					placeholder="Search"
					aria-label="Search"
					onChange={handleSearch}
				/>
				<select class="custom-select" onChange={handleSelect}>
					<option value="" selected>
						Select a category
					</option>
					{uniqueBlogs.map(item => {
						return (
							<option value={item.category} key={item.id}>
								{item.category}
							</option>
						);
					})}
				</select>
			</div>
			{data.map(blog => (
				<Blog key={blog.id} id={blog.id} image={blog.file?blog.file:blogImg} title={blog.title} category={blog.category} />
			))}
		</div>
	);
};

const mapStateToProps = state => ({ allBlogs: state.blogs });
export default connect(mapStateToProps)(ListBlogs);
