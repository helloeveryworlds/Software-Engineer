package com.bossmode.backend.dao;


import com.bossmode.backend.entity.OrderItem;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class OrderItemDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void save(OrderItem orderItem) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();//只要其中一个failed（error发生），就当没有发生
            session.save(orderItem);//存在db里面，还没有commit
            session.getTransaction().commit();//在这儿写很多东西，这儿才是真正写进db。

        } catch (Exception ex) {
            ex.printStackTrace();
            if (session != null) session.getTransaction().rollback();
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }
    public OrderItem findByUrlAndName(String url, String name) {
        try (Session session = sessionFactory.openSession()) {
            Query<OrderItem> query = session.createQuery("from OrderItem where url = :url and name = :name", OrderItem.class);
            query.setParameter("url", url);
            query.setParameter("name", name);
            return query.uniqueResult();
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

}
