import { saveSubscriber, getSubscribers } from '../services/storageService.js';

export async function subscribeNewsletter(req, res, next) {
  try {
    const email = String(req.body?.email || req.body?.c_email || '').trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.'
      });
    }

    const result = await saveSubscriber(email);

    if (result.alreadySubscribed) {
      return res.json({
        success: true,
        message: 'You are already subscribed to Ariselux updates and technical bulletins.'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to Ariselux technical news and product announcements.'
    });
  } catch (err) {
    next(err);
  }
}

export async function getSubscribersList(req, res, next) {
  try {
    const list = await getSubscribers();
    return res.json({
      success: true,
      total: list.length,
      data: list
    });
  } catch (err) {
    next(err);
  }
}
