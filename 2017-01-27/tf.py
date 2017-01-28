import time
import os
print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
import input_data
mnist = input_data.read_data_sets(".")

import tensorflow as tf
import numpy as np

learning_rate = 0.01
training_iteration = 1
batch_size = 100
display_step = 2

x = tf.placeholder("float", [None, 28*28])
y = tf.placeholder("float", [None, 10])

W = tf.Variable(tf.zeros([28*28, 10]))
b = tf.Variable(tf.zeros([10]))

with tf.name_scope("Wx_b") as scope:
    model = tf.nn.softmax(tf.matmul(x, W) + b)

w_h = tf.histogram_summary("weights", W)
b_h = tf.histogram_summary("biases", b)

with tf.name_scope("cost_function") as scope:
    cost_function = -tf.reduce_sum(y*tf.log(model))
    tf.scalar_summary("cost_function", cost_function)

with tf.name_scope("train") as scope:
    optimizer = tf.train.GradientDescentOptimizer(learning_rate).minimize(cost_function)


init = tf.initialize_all_variables()

merged_summary_op = tf.merge_all_summaries()

with tf.Session() as sess:
    sess.run(init)

    d = './logs/'+str(time.time())
    os.mkdirs(d,exist_ok=True)

    summary_writer = tf.train.SummaryWriter(d, graph_def=sess.graph_def)

    for iteration in range(training_iteration):
        avg_cost = 0.
        total_batch = int(mnist.train.num_examples/batch_size)
        for i in range(total_batch):
            batch_xs, batch_ys = mnist.train.next_batch(batch_size)
            batch_ys = np.column_stack([ (batch_ys==i).astype(int) for i in range(10) ]) # 1 for the column of the label, 0 for others
            vs = { x:batch_xs, y:batch_ys }
            sess.run(optimizer, feed_dict=vs)
            avg_cost += sess.run(cost_function, feed_dict=vs)/total_batch
            summary_str = sess.run(merged_summary_op, feed_dict=vs)
            summary_writer.add_summary(summary_str, iteration*total_batch+i)
        if iteration % display_step == 0:
            print("Iteration:{:d} cost={:.9f}".format(iteration+1, avg_cost))

    print("Tuning complete")

    predictions = tf.equal(tf.argmax(model,1), tf.argmax(y, 1))

    accurancy = tf.reduce_mean(tf.cast(predictions, "float"))
    labels = np.column_stack([ (mnist.test.labels==i).astype(int) for i in range(10) ])
    print("Accurancy:"+str(accurancy.eval({x: mnist.test.images, y: labels})))

    print(str(model.eval({x: mnist.test.images[:1,:], y: labels[:1,:]})))
    print(str(y.eval({x: mnist.test.images[:1,:], y: labels[:1,:]})))


    im = x.eval({x: mnist.test.images[:1,:], y: labels[:1,:]}).reshape((28,28))
    
    import matplotlib.pyplot as plt

    plt.gray()
    plt.imshow(im)
    plt.show()

    sess.close()

