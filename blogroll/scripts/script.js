"use strict";

// backbone model
var Blog = Backbone.Model.extend({
  defaults: {
    author: '',
    title: '',
    url: ''
  }
})

// backbone collection

var Blogs = Backbone.Collection.extend({});

// new blogs

var blog1 = new Blog({
  author: 'Jaime',
  title: 'A New Blog',
  url: 'https://anewblog.com'
});

var blog2 = new Blog({
  author: 'Snyder',
  title: 'BvS',
  url: 'https://itwasokay.com'
});

var blogs = new Blogs([blog1, blog2]);

// backbone views

// single blog
const BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function() {
    this.template = _.template($('.blogs-list-template').html());
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// all blogs
const BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function() {
    this.model.on('add', this.render, this)
  },
  render: function() {
    var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), (blog) => {
			self.$el.append((new BlogView({model: blog})).render().$el);
		});
		return this;
  }
});

const blogsView = new BlogsView();

$(document).ready(function() {
  $('.add-blog').on('click', () => {
    let blog = new Blog({
      author: $('.author-input').val(),
      title: $('.title-input').val(),
      url: $('.url-input').val()
    });
    $('.author-input').val(''),
    $('.title-input').val(''),
    $('.url-input').val('')
    blogs.add(blog);
  });
});
