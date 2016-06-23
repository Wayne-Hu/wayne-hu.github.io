---
layout: post
title: Angular -- Data Binding
description: 本文并非纯粹翻译Angular文档,只是在关键地方给出译文,在每段后给出自己的理解,并在最后对技术根据自己的经验给出一定的总结。Angular双向数据绑定。
category: Web
tags: [Angular, Data Binding]
---

# Data Binding

Data-binding in Angular apps is the automatic synchronization of data between the model and view components. The way that Angular implements data-binding lets you treat the model as the single-source-of-truth (单一正确的数据源) in your application. The view is a projection of the model at all times (视图在任何时候都只是数据模型的投影). When the model changes, the view reflects the change, and vice versa.

> 双向绑定，数据模型改变就会反映到页面上，而页面改变了数据，数据模型也会跟着变化。


## Data Binding in Classical Template Systems （传统模板系统中的数据绑定）

![](https://docs.angularjs.org/img/One_Way_Data_Binding.png)
Most templating systems bind data in only one direction: they _merge template and model components together into a view (我的理解：根据视图所需数据创建一个普通类作为模板，再通过数据模型来构造对象提供给视图)_. After the merge occurs, changes to the model or related sections of the view are NOT automatically reflected in the view. Worse, any changes that the user makes to the view are not reflected in the model. This means that the developer has to write code that constantly syncs the view with the model and the model with the view.

> 传统数据绑定的坏处显而易见，就是开发人员需要一直同步视图和数据模型。


## Data Binding in Angular Templates

![](https://docs.angularjs.org/img/Two_Way_Data_Binding.png)
Angular templates work differently. First the template (which is the uncompiled HTML along with any additional markup or directives) is compiled on the browser. The compilation step produces a live view. Any changes to the view are immediately reflected in the model, and any changes in the model are propagated to the view. The model is the _single-source-of-truth （单一正确的数据源）_ for the application state, greatly simplifying the programming model for the developer. You can think of the view as simply an instant projection of your model.

Because the view is just a projection of the model, the controller is completely separated from the view and unaware of it. This makes testing a snap because it is easy to test your controller in isolation without the view and the related DOM/browser dependency.

> 双向绑定的好处
> 
> - 很大程度的简化了编程模型
> - controller同视图分开而不会意识到视图的存在，这样就会方便独立测试controller
> 
> 🤔 不好的方面？
> React采用了不同的方案，Flux强调单向数据流。Redux的做法是通过触发Action，由Reducer来改变数据，通过绑定数据到视图上来显示，视图上数据的改变不会影响数据模型，将改变后的数据通过Action传递到Reducer来进行改变。


## Related Topics

-   [Angular Scopes](https://docs.angularjs.org/guide/scope)
-   [Angular Templates](https://docs.angularjs.org/guide/templates)

