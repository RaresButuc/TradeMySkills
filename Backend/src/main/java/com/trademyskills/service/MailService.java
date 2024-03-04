package com.trademyskills.service;

import com.trademyskills.model.ChangePasswordLink;
import com.trademyskills.model.MailStructure;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final ChangePasswordLinkService changePasswordLinkService;

    public void sendMail(String mail, MailStructure mailStructure) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setSubject(mailStructure.getSubject());
        simpleMailMessage.setText(mailStructure.getMessage());
        simpleMailMessage.setTo(mail);


        mailSender.send(simpleMailMessage);
    }


    public void sendSetPasswordEmail(String email) throws MessagingException {
        String uuid = UUID.randomUUID().toString();
        changePasswordLinkService.addNewLink(uuid, email);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Set Password");
        mimeMessageHelper.setText("""
                <div>
                <h5>Trade-My-Skills Support Here!</h5>
                <a href="http://localhost:3000/change-forget-password/%s" target="_blank">  Click here to set a new Password </a>
                </div>
                """.formatted(uuid), true);
        mailSender.send(mimeMessage);
    }

    public void sendGiveRating(String email, String adName , Long to) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Rate your experience");
        mimeMessageHelper.setText("""
                <div>
                <h5>Trade-My-Skills Support Here!</h5>
                <a href="http://localhost:3000/rating/%s" target="_blank"> Please rate your experience on %s! </a>
                <div>
                """.formatted( to, adName), true);
        mailSender.send(mimeMessage);

    }

}
